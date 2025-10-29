/**
 * PHOTO UPLOAD PREVIEW
 * 
 * Creates elegant, high-quality preview of uploaded photos
 * with clear visual feedback that photos were successfully uploaded.
 * 
 * Author: High Web Strategist & Designer
 * Date: October 29, 2025
 */

(function() {
    'use strict';
    
    const fileInput = document.querySelector('.file-upload-input');
    const filePreview = document.querySelector('.file-preview');
    const uploadButton = document.querySelector('.upload-button');
    const uploadZone = document.querySelector('.upload-zone');
    
    if (!fileInput || !filePreview) {
        console.warn('Photo upload elements not found');
        return;
    }
    
    // Store uploaded files
    let uploadedFiles = [];
    
    /**
     * Handle file selection
     */
    function handleFiles(files) {
        // Convert FileList to Array
        const filesArray = Array.from(files);
        
        // Limit to 3 photos
        const newFiles = filesArray.slice(0, 3 - uploadedFiles.length);
        
        if (newFiles.length === 0) {
            showNotification('Maximum 3 photos allowed', 'warning');
            return;
        }
        
        // Add new files
        uploadedFiles = uploadedFiles.concat(newFiles);
        
        // Update preview
        updatePreview();
        
        // Show success message (longer duration)
        showNotification(`${newFiles.length} photo(s) uploaded successfully! ✓`, 'success', 5000);
        
        // Hide upload zone if we have 3 photos
        if (uploadedFiles.length >= 3) {
            uploadZone.style.display = 'none';
        }
    }
    
    /**
     * Update preview display
     */
    function updatePreview() {
        filePreview.innerHTML = '';
        
        if (uploadedFiles.length === 0) {
            return;
        }
        
        // Create preview container
        const previewContainer = document.createElement('div');
        previewContainer.className = 'photo-preview-container';
        
        // Add title
        const title = document.createElement('h4');
        title.className = 'preview-title';
        title.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Your Photos (${uploadedFiles.length}/3)
        `;
        previewContainer.appendChild(title);
        
        // Create grid
        const grid = document.createElement('div');
        grid.className = 'photo-preview-grid';
        
        uploadedFiles.forEach((file, index) => {
            const photoCard = createPhotoCard(file, index);
            grid.appendChild(photoCard);
        });
        
        previewContainer.appendChild(grid);
        
        // Add upload more button if less than 3
        if (uploadedFiles.length < 3) {
            const uploadMoreBtn = document.createElement('button');
            uploadMoreBtn.type = 'button';
            uploadMoreBtn.className = 'upload-more-btn';
            uploadMoreBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add More Photos (${3 - uploadedFiles.length} remaining)
            `;
            uploadMoreBtn.addEventListener('click', () => fileInput.click());
            previewContainer.appendChild(uploadMoreBtn);
        }
        
        filePreview.appendChild(previewContainer);
    }
    
    /**
     * Create photo card element
     */
    function createPhotoCard(file, index) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        // Create image element
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-img-container';
        
        const img = document.createElement('img');
        img.className = 'photo-img';
        img.alt = `Photo ${index + 1}`;
        
        // Read file and set image source
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        imgContainer.appendChild(img);
        
        // Success badge
        const badge = document.createElement('div');
        badge.className = 'photo-badge';
        badge.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
        `;
        imgContainer.appendChild(badge);
        
        card.appendChild(imgContainer);
        
        // Photo info
        const info = document.createElement('div');
        info.className = 'photo-info';
        
        const name = document.createElement('div');
        name.className = 'photo-name';
        name.textContent = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
        
        const size = document.createElement('div');
        size.className = 'photo-size';
        size.textContent = formatFileSize(file.size);
        
        info.appendChild(name);
        info.appendChild(size);
        card.appendChild(info);
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'photo-remove-btn';
        removeBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;
        removeBtn.addEventListener('click', () => removePhoto(index));
        card.appendChild(removeBtn);
        
        return card;
    }
    
    /**
     * Remove photo
     */
    function removePhoto(index) {
        uploadedFiles.splice(index, 1);
        updatePreview();
        
        // Show upload zone again if hidden
        if (uploadedFiles.length < 3) {
            uploadZone.style.display = 'flex';
        }
        
        // Update file input
        updateFileInput();
        
        showNotification('Photo removed', 'info');
    }
    
    /**
     * Update file input with current files
     */
    function updateFileInput() {
        // Create new DataTransfer object
        const dataTransfer = new DataTransfer();
        
        // Add all current files
        uploadedFiles.forEach(file => {
            dataTransfer.items.add(file);
        });
        
        // Update input files
        fileInput.files = dataTransfer.files;
    }
    
    /**
     * Format file size
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    /**
     * Show notification
     */
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `photo-notification photo-notification-${type}`;
        
        const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ';
        notification.innerHTML = `<span class="notification-icon">${icon}</span> ${message}`;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after specified duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
    
    /**
     * Event listeners
     */
    
    // File input change
    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });
    
    // Upload button click
    if (uploadButton) {
        uploadButton.addEventListener('click', () => fileInput.click());
    }
    
    // Drag and drop
    if (uploadZone) {
        uploadZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        uploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        });
    }
    
})();
