import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processAllEpisodes(episodeData: []) {
    console.log('-----Episode Data -------');
    console.log(episodeData);
  }
}
