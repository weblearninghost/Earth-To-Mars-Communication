import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  processAllEpisodes(episodeData: []) {
    if (episodeData.length) {
      episodeData.forEach((episode: any) => {
        if (episode.characters.length) {
          episode.characters.forEach((character: any) => {
            const characterURL = character;
            if (characterURL) {
              axios
                .get(characterURL)
                .then((result) => {
                  console.log(result.data);
                  if (result.data) {
                    character = result.data;
                  }
                })
                .catch((err) => {
                  //console.log('Error Occurred:', err);
                  throw new InternalServerErrorException();
                });
            }
          });
        }
      });
      console.log({ episodeData });
    }
  }
}
