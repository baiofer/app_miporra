/* eslint-disable react/prop-types */
import { useState } from 'react';
import logoImage from '../images/LOGO.png'
import './PhotoSelector.css'

function PhotoSelector({ onFileSelected }) {
  
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        onFileSelected(file)

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file)
        }
    };

    return (
        <div className='photoSelector-container'>
            <div className='photoSelector-containerSelector'>
                <label htmlFor="fileInput" className="photoSelector-inputContainer">
                    <span>Selecciona un archivo</span>
                    <input
                        className='photoSelector-input'
                        type="file"
                        accept="image/*"
                        onChange={ handleImageChange }
                    />
                </label>
            </div>
        
            {
                selectedImage && (
                    <div className='photoselector-imageContainer'>
                        <img 
                            className='photoSelector-image'
                            src={selectedImage ? selectedImage : logoImage} 
                            alt="Imagen seleccionada" 
                            style={{ maxWidth: '100%', height: '100%' }} 
                        />
                    </div>
                )
            }
        </div>
    );
}

export default PhotoSelector;