document.addEventListener('DOMContentLoaded', () => {
    const selectImage = document.querySelector('.select-image');
    const fileInput = document.querySelector('#fileInput');
    const imgArea = document.querySelector('.img-area');
    const takePictureButton = document.querySelector('#takePictureButton');
    const cameraInput = document.querySelector('#cameraInput');

    let selectedImage = null;

    selectImage.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        const image = this.files[0];
        if (image.size < 2000000) {     
            const reader = new FileReader();
            reader.onload = () => {
                const allImg = imgArea.querySelectorAll('img');
                allImg.forEach(item => item.remove());
                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = image.name;
                selectedImage = image;
            };
            reader.readAsDataURL(image);
        } else {
            alert("Image size more than 2MB");
        }
    });

    takePictureButton.addEventListener('click', function () {
        cameraInput.click();
    });

    cameraInput.addEventListener('change', function () {
        const image = this.files[0];
        if (image.size < 2000000) {
            const reader = new FileReader();
            reader.onload = () => {
                const allImg = imgArea.querySelectorAll('img');
                allImg.forEach(item => item.remove());
                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = image.name;
                selectedImage = image;
            };
            reader.readAsDataURL(image);
        } else {
            alert("Image size more than 2MB");
        }
    });
    
    submitImage.addEventListener('click', async () => {
        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append('receipt', selectedImage);

        try {
            const response = await fetch('/upload-receipt', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    });
});
