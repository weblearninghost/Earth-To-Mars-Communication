import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { Response } from 'express';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-all-episodes')
  getAllEpisodes(@Res() res: Response) {
    const episodeURL = 'https://rickandmortyapi.com/api/episode';
    let episodeData: [];
    axios
      .get(episodeURL)
      .then((apiResponse) => {
        const episodes: [] = apiResponse.data.results;
        episodeData = [...episodes];
        const finalData = this.appService.processAllEpisodes(episodeData);
        res.status(200).json({ finalData });
      })
      .catch((err) => {
        console.log('ERROR OCCURRED:', err);
      });
  }
}
