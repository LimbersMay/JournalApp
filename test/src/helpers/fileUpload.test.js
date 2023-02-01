import {fileUpload} from "../../../src/helpers";

describe('pruebas en fileUpload', () => {

    test("Debe de subir el archivo correctamente a cloudinary", async () => {
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        expect(2).toBe(2);
    });
});
