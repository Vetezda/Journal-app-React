import { v2 as cloudinary } from 'cloudinary';
import { fileUploadCloudinary } from "../../src/helpers/fileUploadCloudinary";

cloudinary.config({
    cloud_name: 'dnhavqmec',
    api_key: '185768689581431', 
    api_secret: 'Phvxp1OueejHib3ZBGKJp505m-w',
    secure: true
});

describe('Pruebas en fileUpload', () => { 

    test('Debe subir el archivo correctamente a Cloudinary', async() => {
        const imageUrl = 'https://www.diariomotor.com/imagenes/2021/09/corvette-z06-2023-adelanto-1.jpg'; 
        const resp = await fetch (imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUploadCloudinary(file);
        expect(typeof url).toBe('string'); 

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        console.log({ imageId });

        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
           resource_type: 'image'
        });

     });

     test('Debe retornar un null', async() => {
        const file = new File([], 'foto.jpg');
        const url = await fileUploadCloudinary(file);
        expect(url).toBe(null); 
     });

 }) 