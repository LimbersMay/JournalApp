import { v2 as cloudinary } from 'cloudinary'
import {fileUpload} from "../../src/helpers";

cloudinary.config({
    cloud_name: 'ds1tmpfj7',
    api_key: '937892637749435',
    api_secret: 'psaMFlFBD7CmfAa7Q-a6DH4_Opw',
    secure: true
})

describe('pruebas en fileUpload', () => {

    test("debe de subir el archivo correctamente a cloudinary", async () => {
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '')

        await cloudinary.api.delete_resources(['journal-app/' + imageId]);
    });

    test("debe de retornar null", async() => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect(url).toBe(undefined);
    })
});
