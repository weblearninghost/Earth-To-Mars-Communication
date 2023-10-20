import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-all-episodes')
  getAllEpisodes() {
    const episodeURL = 'https://rickandmortyapi.com/api/episode';
    let episodeData: [];
    axios
      .get(episodeURL)
      .then((apiResponse) => {
        const episodes: [] = apiResponse.data.results;
        episodeData = [...episodes];
        this.appService.processAllEpisodes(episodeData);
      })
      .catch((err) => {
        console.log('ERROR OCCURRED:', err);
      });
  }
}
