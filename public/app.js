/**
 * NutriScanner — Frontend Client Logic
 * Core Principle: Facts, not verdicts.
 */

// Configuration
const CONFIG = {
  ANALYZE_ENDPOINT: 'http://localhost:5680/webhook/api/analyze',
  CONFIRM_ENDPOINT: 'http://localhost:5680/webhook/api/analyze/confirm',
  // MVP Technical Constraint: 1 primary label photo per analysis call for fast & reliable inference
  // Product Roadmap Vision: Multi-photo package analysis (1-4 images) is deferred to future phase
  MAX_IMAGES: 1,
};

// Application State
const state = {
  currentScreen: 'screenIntake',
  selectedFiles: [], // Array of File objects (1 photo for MVP primary intake)
  activeTab: 'photo', // photo | text | manual
  cameraStream: null,
  sessionId: null,
  rawExtraction: null, // Candidate data returned from AI
  canonicalData: null, // Final confirmed & calculated data
  isUserModified: false,
};

// DOM Elements
const elements = {
  // Screens
  screenIntake: document.getElementById('screenIntake'),
  screenLoading: document.getElementById('screenLoading'),
  screenReview: document.getElementById('screenReview'),
  screenResult: document.getElementById('screenResult'),
  systemStatus: document.getElementById('systemStatus'),

  // Tabs
  tabBtnPhoto: document.getElementById('tabPhoto'),
  tabBtnText: document.getElementById('tabText'),
  tabBtnManual: document.getElementById('tabManual'),
  panelPhoto: document.getElementById('panelPhoto'),
  panelText: document.getElementById('panelText'),
  panelManual: document.getElementById('panelManual'),

  // Intake - Photo
  dropZone: document.getElementById('dropZone'),
  fileInput: document.getElementById('fileInput'),
  btnBrowseFiles: document.getElementById('btnBrowseFiles'),
  btnOpenCamera: document.getElementById('btnOpenCamera'),
  previewContainer: document.getElementById('previewContainer'),
  previewGrid: document.getElementById('previewGrid'),
  previewCount: document.getElementById('previewCount'),
  btnClearAllPhotos: document.getElementById('btnClearAllPhotos'),
  btnAnalyzePhotos: document.getElementById('btnAnalyzePhotos'),

  // Camera Modal
  cameraModal: document.getElementById('cameraModal'),
  cameraVideo: document.getElementById('cameraVideo'),
  cameraCanvas: document.getElementById('cameraCanvas'),
  btnCloseCamera: document.getElementById('btnCloseCamera'),
  btnCapturePhoto: document.getElementById('btnCapturePhoto'),

  // Intake - Text & Manual
  textInput: document.getElementById('textInput'),
  btnAnalyzeText: document.getElementById('btnAnalyzeText'),
  btnAnalyzeManual: document.getElementById('btnAnalyzeManual'),

  // Review Screen
  btnBackToIntake: document.getElementById('btnBackToIntake'),
  reviewProvenanceBadge: document.getElementById('reviewProvenanceBadge'),
  conflictBanner: document.getElementById('conflictBanner'),
  conflictListText: document.getElementById('conflictListText'),
  missingBanner: document.getElementById('missingBanner'),
  missingList: document.getElementById('missingList'),
  reviewName: document.getElementById('reviewName'),
  reviewBrand: document.getElementById('reviewBrand'),
  reviewServingSize: document.getElementById('reviewServingSize'),
  reviewServingUnit: document.getElementById('reviewServingUnit'),
  reviewServingsPerContainer: document.getElementById('reviewServingsPerContainer'),
  reviewEnergy: document.getElementById('reviewEnergy'),
  reviewProtein: document.getElementById('reviewProtein'),
  reviewTotalFat: document.getElementById('reviewTotalFat'),
  reviewSatFat: document.getElementById('reviewSatFat'),
  reviewCarb: document.getElementById('reviewCarb'),
  reviewSugar: document.getElementById('reviewSugar'),
  reviewSodium: document.getElementById('reviewSodium'),
  reviewIngredients: document.getElementById('reviewIngredients'),
  reviewAllergens: document.getElementById('reviewAllergens'),
  btnConfirmReview: document.getElementById('btnConfirmReview'),

  // Result Screen
  resProductName: document.getElementById('resProductName'),
  resProductBrand: document.getElementById('resProductBrand'),
  resNeutralSummary: document.getElementById('resNeutralSummary'),
  resServingSize: document.getElementById('resServingSize'),
  resServingsCount: document.getElementById('resServingsCount'),
  resCalcStatus: document.getElementById('resCalcStatus'),
  resCalcHint: document.getElementById('resCalcHint'),
  nutriTableBody: document.getElementById('nutriTableBody'),
  ingredientList: document.getElementById('ingredientList'),
  allergenSection: document.getElementById('allergenSection'),
  allergenContent: document.getElementById('allergenContent'),
  missingSection: document.getElementById('missingSection'),
  missingFactsList: document.getElementById('missingFactsList'),
  btnScanAnother: document.getElementById('btnScanAnother'),

  // Toast
  toastContainer: document.getElementById('toastContainer'),
};

// ============================================================================
// UI Navigation & Tab Switching
// ============================================================================

function switchScreen(screenId) {
  state.currentScreen = screenId;
  const screens = [elements.screenIntake, elements.screenLoading, elements.screenReview, elements.screenResult];
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tabMode) {
  state.activeTab = tabMode;
  [elements.tabBtnPhoto, elements.tabBtnText, elements.tabBtnManual].forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === tabMode);
    btn.setAttribute('aria-selected', btn.dataset.mode === tabMode);
  });

  [elements.panelPhoto, elements.panelText, elements.panelManual].forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel${capitalize(tabMode)}`);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showToast(message, type = 'error') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// ============================================================================
// File Handling & Intake (MVP Single-Photo Primary Input)
// ============================================================================

function handleFilesAdded(files) {
  const fileArray = Array.from(files);
  const validFiles = fileArray.filter(f => f.type.startsWith('image/'));
  if (validFiles.length === 0) {
    showToast('Harap pilih file gambar yang valid (JPG, PNG, WEBP).');
    return;
  }

  // MVP single-photo intake
  state.selectedFiles = [validFiles[0]];
  renderImagePreviews();
}

function removeFile(index) {
  state.selectedFiles.splice(index, 1);
  renderImagePreviews();
}

function clearAllFiles() {
  state.selectedFiles = [];
  renderImagePreviews();
}

function renderImagePreviews() {
  const count = state.selectedFiles.length;
  elements.previewCount.textContent = count > 0 ? '1 foto label terpilih' : '0 foto terpilih';
  elements.btnAnalyzePhotos.disabled = count === 0;

  if (count === 0) {
    elements.previewContainer.classList.add('hidden');
    elements.previewGrid.innerHTML = '';
    return;
  }

  elements.previewContainer.classList.remove('hidden');
  elements.previewGrid.innerHTML = '';

  state.selectedFiles.forEach((file, idx) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = 'Foto Label Produk';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'preview-remove-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Ganti/Hapus foto';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      removeFile(idx);
    };

    item.appendChild(img);
    item.appendChild(removeBtn);
    elements.previewGrid.appendChild(item);
  });
}

// Drag & Drop Listeners
elements.dropZone.addEventListener('click', () => elements.fileInput.click());
elements.btnBrowseFiles.addEventListener('click', (e) => {
  e.stopPropagation();
  elements.fileInput.click();
});

elements.fileInput.addEventListener('change', (e) => {
  if (e.target.files.length) {
    handleFilesAdded(e.target.files);
    e.target.value = '';
  }
});

elements.dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  elements.dropZone.classList.add('dragover');
});

elements.dropZone.addEventListener('dragleave', () => {
  elements.dropZone.classList.remove('dragover');
});

elements.dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  elements.dropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    handleFilesAdded(e.dataTransfer.files);
  }
});

elements.btnClearAllPhotos.addEventListener('click', clearAllFiles);

// ============================================================================
// Camera Capture (Progressive Enhancement)
// ============================================================================

async function openCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('Kamera tidak didukung pada browser ini. Silakan gunakan tombol Pilih File.');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
    });
    state.cameraStream = stream;
    elements.cameraVideo.srcObject = stream;
    elements.cameraModal.classList.remove('hidden');
  } catch (err) {
    console.warn('Camera access denied or unavailable:', err);
    showToast('Tidak dapat mengakses kamera. Silakan pilih file foto dari galeri.');
  }
}

function closeCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(track => track.stop());
    state.cameraStream = null;
  }
  elements.cameraModal.classList.add('hidden');
}

function capturePhotoFromCamera() {
  const canvas = elements.cameraCanvas;
  const video = elements.cameraVideo;
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (blob) {
      const file = new File([blob], `label_camera_${Date.now()}.jpg`, { type: 'image/jpeg' });
      handleFilesAdded([file]);
    }
    closeCamera();
  }, 'image/jpeg', 0.85);
}

elements.btnOpenCamera.addEventListener('click', openCamera);
elements.btnCloseCamera.addEventListener('click', closeCamera);
elements.btnCapturePhoto.addEventListener('click', capturePhotoFromCamera);

elements.tabBtnPhoto.addEventListener('click', () => switchTab('photo'));
elements.tabBtnText.addEventListener('click', () => switchTab('text'));
elements.tabBtnManual.addEventListener('click', () => switchTab('manual'));

// ============================================================================
// Analysis Trigger & Fail-Fast Webhook Communication (NO FAKE FALLBACK)
// ============================================================================

async function compressImageFile(file, maxDimension = 800, quality = 0.75) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        } else {
          resolve(file);
        }
      }, 'image/jpeg', quality);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

async function triggerAnalysis(mode) {
  switchScreen('screenLoading');

  const formData = new FormData();
  formData.append('mode', mode);

  if (mode === 'photo') {
    if (state.selectedFiles.length === 0) {
      showToast('Harap pilih 1 foto label kemasan.');
      switchScreen('screenIntake');
      return;
    }
    const originalFile = state.selectedFiles[0];
    const compressedFile = await compressImageFile(originalFile);
    formData.append('image_0', compressedFile, compressedFile.name);
  } else if (mode === 'text') {
    const text = elements.textInput.value.trim();
    if (!text) {
      showToast('Harap masukkan teks label.');
      switchScreen('screenIntake');
      return;
    }
    formData.append('text', text);
  } else if (mode === 'manual') {
    const manualData = getManualFormData();
    formData.append('manual', JSON.stringify(manualData));
  }

  try {
    const response = await fetch(CONFIG.ANALYZE_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      const errMsg = errJson?.error?.message || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || 'Ekstraksi label gagal.');
    }

    handleExtractionResponse(data);
  } catch (error) {
    console.error('Extraction request failed:', error);
    // Explicit Fail-Fast: Never inject fake/mock data!
    switchScreen('screenIntake');
    showToast(`Gagal memproses analisis label: ${error.message || 'Koneksi ke server n8n terputus.'} Silakan coba lagi.`, 'error');
  }
}

function getManualFormData() {
  return {
    identity: {
      name: document.getElementById('manualName').value.trim() || null,
      brand: document.getElementById('manualBrand').value.trim() || null,
    },
    serving: {
      size: parseFloat(document.getElementById('manualServingSize').value) || null,
      unit: document.getElementById('manualServingUnit').value || null,
      servings_per_container: parseFloat(document.getElementById('manualServingsPerContainer').value) || null,
    },
    nutrition: {
      energy: parseFloat(document.getElementById('manualEnergy').value) || null,
      protein: parseFloat(document.getElementById('manualProtein').value) || null,
      total_fat: parseFloat(document.getElementById('manualFat').value) || null,
      saturated_fat: parseFloat(document.getElementById('manualSatFat').value) || null,
      carbohydrate: parseFloat(document.getElementById('manualCarb').value) || null,
      sugar: parseFloat(document.getElementById('manualSugar').value) || null,
      sodium: parseFloat(document.getElementById('manualSodium').value) || null,
    },
    ingredients: {
      raw_text: document.getElementById('manualIngredients').value.trim() || null,
    }
  };
}

function handleExtractionResponse(data) {
  state.sessionId = data.session_id || `session_${Date.now()}`;
  state.rawExtraction = data.extraction || data;
  state.isUserModified = false;

  // Set Provenance Badge
  if (elements.reviewProvenanceBadge) {
    if (data.source === 'user_provided') {
      elements.reviewProvenanceBadge.textContent = 'Sumber: Input Manual';
      elements.reviewProvenanceBadge.className = 'badge badge-secondary';
    } else {
      elements.reviewProvenanceBadge.textContent = 'Sumber: Ekstraksi AI';
      elements.reviewProvenanceBadge.className = 'badge badge-primary';
    }
  }

  populateReviewForm(state.rawExtraction);
  switchScreen('screenReview');
}

// ============================================================================
// Review Screen & Correction
// ============================================================================

function markUserModified() {
  if (!state.isUserModified) {
    state.isUserModified = true;
    if (elements.reviewProvenanceBadge) {
      elements.reviewProvenanceBadge.textContent = 'Sumber: Telah Diedit Pengguna';
      elements.reviewProvenanceBadge.className = 'badge badge-warning';
    }
  }
}

function populateReviewForm(data) {
  const id = data.identity || {};
  const s = data.serving || {};
  const n = data.nutrition || {};
  const ing = data.ingredients || {};
  const allg = data.allergens || {};

  elements.reviewName.value = id.name || '';
  elements.reviewBrand.value = id.brand || '';
  elements.reviewServingSize.value = (s.size !== null && s.size !== undefined) ? s.size : '';
  elements.reviewServingUnit.value = s.unit || 'g';
  elements.reviewServingsPerContainer.value = (s.servings_per_container !== null && s.servings_per_container !== undefined) ? s.servings_per_container : '';

  elements.reviewEnergy.value = formatVal(n.energy);
  elements.reviewProtein.value = formatVal(n.protein);
  elements.reviewTotalFat.value = formatVal(n.total_fat);
  elements.reviewSatFat.value = formatVal(n.saturated_fat);
  elements.reviewCarb.value = formatVal(n.carbohydrate);
  elements.reviewSugar.value = formatVal(n.sugar);
  elements.reviewSodium.value = formatVal(n.sodium);

  elements.reviewIngredients.value = ing.raw_text || '';
  elements.reviewAllergens.value = allg.explicit_declaration || '';

  // Attach change listener to update provenance
  const reviewInputs = [
    elements.reviewName, elements.reviewBrand, elements.reviewServingSize,
    elements.reviewServingUnit, elements.reviewServingsPerContainer, elements.reviewEnergy,
    elements.reviewProtein, elements.reviewTotalFat, elements.reviewSatFat,
    elements.reviewCarb, elements.reviewSugar, elements.reviewSodium,
    elements.reviewIngredients, elements.reviewAllergens
  ];
  reviewInputs.forEach(input => {
    input.removeEventListener('input', markUserModified);
    input.addEventListener('input', markUserModified);
  });

  // Handle Conflicts Display
  if (data.conflicts && data.conflicts.length > 0) {
    elements.conflictBanner.classList.remove('hidden');
    elements.conflictListText.textContent = data.conflicts.map(c => `${c.message || `${c.field}: ${c.values.join(' vs ')}`}`).join(' | ');
  } else {
    elements.conflictBanner.classList.add('hidden');
  }

  // Handle Missing Information Display (Information Not Available)
  if (data.missing_information && data.missing_information.length > 0) {
    elements.missingBanner.classList.remove('hidden');
    elements.missingList.innerHTML = data.missing_information.map(m => `<li>${escapeHtml(m)}</li>`).join('');
  } else {
    elements.missingBanner.classList.add('hidden');
  }
}

function formatVal(val) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'object' && val.value !== undefined) return val.value;
  return val;
}

function parseInputVal(el) {
  const val = el.value.trim();
  if (val === '') return null;
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}

// ============================================================================
// Final Deterministic Calculations & Result Presentation
// ============================================================================

function confirmReviewAndFinalize() {
  const confirmedData = {
    identity: {
      name: elements.reviewName.value.trim() || null,
      brand: elements.reviewBrand.value.trim() || null,
    },
    serving: {
      size: parseInputVal(elements.reviewServingSize),
      unit: elements.reviewServingUnit.value || null,
      servings_per_container: parseInputVal(elements.reviewServingsPerContainer),
    },
    nutrition: {
      energy: parseInputVal(elements.reviewEnergy),
      protein: parseInputVal(elements.reviewProtein),
      total_fat: parseInputVal(elements.reviewTotalFat),
      saturated_fat: parseInputVal(elements.reviewSatFat),
      carbohydrate: parseInputVal(elements.reviewCarb),
      sugar: parseInputVal(elements.reviewSugar),
      sodium: parseInputVal(elements.reviewSodium),
    },
    ingredients: {
      raw_text: elements.reviewIngredients.value.trim() || null,
      items: state.rawExtraction?.ingredients?.items || parseIngredientsFromText(elements.reviewIngredients.value.trim()),
    },
    allergens: {
      explicit_declaration: elements.reviewAllergens.value.trim() || null,
      items: state.rawExtraction?.allergens?.items || [],
    },
    missing_information: state.rawExtraction?.missing_information || []
  };

  // Run Strict Deterministic Calculation
  const servings = confirmedData.serving.servings_per_container;
  const canCalculatePackage = (typeof servings === 'number' && servings > 0);

  const calculatedPackage = {};
  const standardNutrients = ['energy', 'protein', 'total_fat', 'saturated_fat', 'carbohydrate', 'sugar', 'sodium'];

  standardNutrients.forEach(nutr => {
    const valPerServing = confirmedData.nutrition[nutr];
    if (typeof valPerServing === 'number' && canCalculatePackage) {
      // Deterministic math: nutrient per serving * servings per container
      calculatedPackage[nutr] = Math.round((valPerServing * servings) * 100) / 100;
    } else {
      calculatedPackage[nutr] = null;
    }
  });

  state.canonicalData = {
    identity: confirmedData.identity,
    serving: confirmedData.serving,
    nutrition: confirmedData.nutrition,
    calculated: {
      package: calculatedPackage,
      can_calculate_package: canCalculatePackage,
    },
    ingredients: confirmedData.ingredients,
    allergens: confirmedData.allergens,
    missing_information: confirmedData.missing_information,
    source: state.isUserModified ? 'user_edited' : (state.rawExtraction?.source || 'ai_extracted')
  };

  renderResultScreen(state.canonicalData);
  switchScreen('screenResult');
}

function parseIngredientsFromText(text) {
  if (!text) return [];
  return text.split(',').map(s => s.trim()).filter(Boolean).map(name => ({
    name,
    role: null,
    description: null
  }));
}

// ============================================================================
// Render Fact-Based Nutrition Table & Neutral Summary
// ============================================================================

function renderResultScreen(data) {
  const id = data.identity || {};
  const s = data.serving || {};
  const n = data.nutrition || {};
  const calc = data.calculated?.package || {};
  const canCalc = data.calculated?.can_calculate_package;
  const ing = data.ingredients || {};
  const allg = data.allergens || {};

  elements.resProductName.textContent = id.name || 'Produk Makanan / Minuman';
  elements.resProductBrand.textContent = id.brand ? `Brand: ${id.brand}` : '';

  // Serving info
  if (s.size) {
    elements.resServingSize.textContent = `${s.size} ${s.unit || 'g'}`;
  } else {
    elements.resServingSize.textContent = 'Tidak tertera';
  }

  if (s.servings_per_container) {
    elements.resServingsCount.textContent = `${s.servings_per_container} sajian`;
  } else {
    elements.resServingsCount.textContent = 'Tidak tertera';
  }

  // Calculation status banner
  if (canCalc) {
    elements.resCalcStatus.textContent = `Dihitung untuk ${s.servings_per_container} sajian per kemasan`;
    elements.resCalcHint.textContent = 'Perhitungan: Nilai per sajian × Jumlah sajian per kemasan';
  } else {
    elements.resCalcStatus.textContent = 'Kalkulasi total kemasan ditiadakan';
    elements.resCalcHint.textContent = 'Jumlah sajian per kemasan tidak tercantum pada label.';
  }

  // Nutrition Facts Table Rows (Neutral, Facts only)
  const rows = [
    { label: 'Energi Total', unit: 'kkal', key: 'energy' },
    { label: 'Protein', unit: 'g', key: 'protein' },
    { label: 'Lemak Total', unit: 'g', key: 'total_fat' },
    { label: 'Lemak Jenuh', unit: 'g', key: 'saturated_fat' },
    { label: 'Karbohidrat Total', unit: 'g', key: 'carbohydrate' },
    { label: 'Gula', unit: 'g', key: 'sugar' },
    { label: 'Natrium', unit: 'mg', key: 'sodium' },
  ];

  elements.nutriTableBody.innerHTML = rows.map(r => {
    const valServing = n[r.key];
    const valPkg = calc[r.key];

    const servingStr = (typeof valServing === 'number') ? `${valServing} ${r.unit}` : '-';
    const pkgStr = (typeof valPkg === 'number') ? `${valPkg} ${r.unit}` : '-';

    return `
      <tr>
        <td class="table-nutrient-name">${escapeHtml(r.label)}</td>
        <td class="table-nutrient-val">${escapeHtml(servingStr)}</td>
        <td class="table-nutrient-val text-package">${escapeHtml(pkgStr)}</td>
      </tr>
    `;
  }).join('');

  // Neutral Summary (Facts only, zero health judgments/scoring)
  const summaryLines = [];
  if (typeof n.energy === 'number') {
    summaryLines.push(`Produk ini mengandung <strong>${n.energy} kkal</strong> energi per sajian${canCalc && typeof calc.energy === 'number' ? ` (total <strong>${calc.energy} kkal</strong> per kemasan)` : ''}.`);
  }
  if (typeof n.sugar === 'number') {
    summaryLines.push(`Kandungan gula tercatat <strong>${n.sugar} g</strong> per sajian${canCalc && typeof calc.sugar === 'number' ? ` (total <strong>${calc.sugar} g</strong> per kemasan)` : ''}.`);
  }
  if (typeof n.sodium === 'number') {
    summaryLines.push(`Kandungan natrium tercatat <strong>${n.sodium} mg</strong> per sajian${canCalc && typeof calc.sodium === 'number' ? ` (total <strong>${calc.sodium} mg</strong> per kemasan)` : ''}.`);
  }
  if (summaryLines.length === 0) {
    summaryLines.push('Informasi gizi berhasil diekstraksi dari label produk.');
  }

  elements.resNeutralSummary.innerHTML = summaryLines.map(line => `<p class="summary-item">${line}</p>`).join('');

  // Ingredients list
  if (ing.items && ing.items.length > 0) {
    elements.ingredientList.innerHTML = ing.items.map(item => `
      <div class="ingredient-badge">
        <span class="ingredient-name">${escapeHtml(item.name)}</span>
        ${item.role ? `<span class="ingredient-role">(${escapeHtml(item.role)})</span>` : ''}
      </div>
    `).join('');
  } else if (ing.raw_text) {
    elements.ingredientList.innerHTML = `<p class="text-sm text-secondary">${escapeHtml(ing.raw_text)}</p>`;
  } else {
    elements.ingredientList.innerHTML = '<p class="text-sm text-muted">Daftar komposisi tidak terdeteksi pada label.</p>';
  }

  // Allergens
  if (allg.explicit_declaration) {
    elements.allergenSection.classList.remove('hidden');
    elements.allergenContent.innerHTML = `<p class="text-sm font-semibold">${escapeHtml(allg.explicit_declaration)}</p>`;
  } else {
    elements.allergenSection.classList.add('hidden');
  }

  // Missing Information Section (Honesty in lack of data)
  const missingItems = data.missing_information || [];
  if (missingItems.length > 0) {
    elements.missingSection.classList.remove('hidden');
    elements.missingFactsList.innerHTML = missingItems.map(m => `<li>${escapeHtml(m)}</li>`).join('');
  } else {
    elements.missingSection.classList.add('hidden');
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// ============================================================================
// Event Bindings
// ============================================================================

elements.btnAnalyzePhotos.addEventListener('click', () => triggerAnalysis('photo'));
elements.btnAnalyzeText.addEventListener('click', () => triggerAnalysis('text'));
elements.btnAnalyzeManual.addEventListener('click', () => triggerAnalysis('manual'));

elements.btnBackToIntake.addEventListener('click', () => switchScreen('screenIntake'));
elements.btnConfirmReview.addEventListener('click', confirmReviewAndFinalize);
elements.btnScanAnother.addEventListener('click', () => {
  clearAllFiles();
  switchScreen('screenIntake');
});

// Initialize System Status Check
async function checkHealth() {
  try {
    await fetch('http://localhost:5680/healthz', { mode: 'no-cors' });
    elements.systemStatus.className = 'status-indicator status-ready';
    elements.systemStatus.innerHTML = '<span class="status-dot"></span> Sistem Siap';
  } catch (e) {
    elements.systemStatus.className = 'status-indicator status-error';
    elements.systemStatus.innerHTML = '<span class="status-dot"></span> Server n8n Offline';
  }
}

checkHealth();
