import { Response, Request } from "express";

const getImages = function(request: Request, response: Response, next){
    let thumbnails = [];
    for (let i = 0; i < 12; i++){
        thumbnails.push({src: 'http://placehold.it/400x300'});
    }
    response.json(thumbnails);
};

export { getImages }