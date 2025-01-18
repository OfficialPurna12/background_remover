
  const imageUpload = document.getElementById("imageUpload");
const processBtn = document.getElementById("processBtn");
const loading = document.getElementById("loading");
const resultSection = document.getElementById("resultSection");
const originalImage = document.getElementById("originalImage");
const processedImage = document.getElementById("processedImage");
const downloadBtn = document.getElementById("downloadBtn");

// Replace with your Remove.bg API key
const API_KEY = "vyFX4xi7skxfdmMFvigh8hXj";

// Enable process button after image selection
imageUpload.addEventListener("change", () => {
processBtn.disabled = !imageUpload.files.length;

// Display the selected image as the original image
const file = imageUpload.files[0];
const reader = new FileReader();

reader.onload = () => {
  originalImage.src = reader.result;
};

if (file) {
  reader.readAsDataURL(file);
}
});

// Handle background removal
processBtn.addEventListener("click", async () => {
const file = imageUpload.files[0];

if (!file) return;

loading.classList.remove("hidden");
resultSection.classList.add("hidden");
downloadBtn.classList.add("hidden");

// Prepare the form data
const formData = new FormData();
formData.append("image_file", file);
formData.append("size", "auto");

try {
  // Call the Remove.bg API
  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to remove background. Check your API key and file size.");
  }

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  // Display the processed image
  processedImage.src = imageUrl;
  resultSection.classList.remove("hidden");
  downloadBtn.classList.remove("hidden");

  // Enable download button
  downloadBtn.onclick = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "processed_image.png";
    link.click();
  };
} catch (error) {
  alert(error.message);
} finally {
  loading.classList.add("hidden");
}
});

// NAvbar Scrool 
 // Navbar scroll effect
 const navbar = document.querySelector('.navbar');

 window.addEventListener('scroll', () => {
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 
//  PDF

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const convertButton = document.getElementById('convertButton');
    const statusMessage = document.getElementById('statusMessage');
    const resultSection = document.getElementById('resultSection');
    const downloadButton = document.getElementById('downloadButton');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.classList.add('bg-light');
    }

    function unhighlight(e) {
        dropZone.classList.remove('bg-light');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.name.match(/\.(doc|docx)$/)) {
                convertButton.disabled = false;
                statusMessage.textContent = `Selected: ${file.name}`;
                statusMessage.style.color = '#28a745';
            } else {
                convertButton.disabled = true;
                statusMessage.textContent = 'Please choose a Word document (.doc or .docx)';
                statusMessage.style.color = '#dc3545';
            }
        }
    }

    convertButton.addEventListener('click', function() {
        convertButton.disabled = true;
        statusMessage.textContent = 'Processing your file...';
        
        setTimeout(() => {
            resultSection.style.display = 'block';
            statusMessage.textContent = 'Your file has been converted!';
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });

    downloadButton.addEventListener('click', function() {
        statusMessage.textContent = 'Starting download...';
    });
});

// pdf to jpg

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const convertButton = document.getElementById('convertButton');
    const statusMessage = document.getElementById('statusMessage');
    const resultSection = document.getElementById('resultSection');
    const downloadButton = document.getElementById('downloadButton');
    const formatOptions = document.querySelectorAll('.format-option');

    // Format selector functionality
    formatOptions.forEach(option => {
        option.addEventListener('click', function() {
            formatOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.style.borderColor = '#6366f1';
        dropZone.style.backgroundColor = '#f8f9fa';
    }

    function unhighlight(e) {
        dropZone.style.borderColor = '#e2e2e2';
        dropZone.style.backgroundColor = '#fafafa';
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf') {
                if (file.size <= 20 * 1024 * 1024) { // 20MB limit
                    convertButton.disabled = false;
                    statusMessage.textContent = `Selected: ${file.name}`;
                    statusMessage.style.color = '#10b981';
                } else {
                    convertButton.disabled = true;
                    statusMessage.textContent = 'File size exceeds 20MB limit';
                    statusMessage.style.color = '#ef4444';
                }
            } else {
                convertButton.disabled = true;
                statusMessage.textContent = 'Please select a PDF file';
                statusMessage.style.color = '#ef4444';
            }
        }
    }

    convertButton.addEventListener('click', function() {
        const selectedFormat = document.querySelector('.format-option.active').dataset.format;
        convertButton.disabled = true;
        statusMessage.textContent = `Converting to ${selectedFormat.toUpperCase()}...`;
        
        // Simulate conversion process
        setTimeout(() => {
            resultSection.style.display = 'block';
            statusMessage.textContent = `Successfully converted to ${selectedFormat.toUpperCase()}`;
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });

    downloadButton.addEventListener('click', function() {
        statusMessage.textContent = 'Preparing download...';
    });
});