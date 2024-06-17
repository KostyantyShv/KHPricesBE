import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationIqService {
  async getCoordsFromPlaceName(placeName: string) {
    try {
      const baseUrl = process.env.LOCATION_IQ_BASE_URL;
      const locationIQToken = process.env.LOCATION_IQ_ACCESS_TOKEN;
      const uri = `${baseUrl}/search?key=${locationIQToken}&q=${placeName}&format=json&accept-language=en,uk&countrycodes=ua`;

      const response = await axios.get(uri);
      const searchPlace = response.data[0];
      const formatedData = {
        lat: searchPlace.lat,
        lng: searchPlace.lon,
        displayName: searchPlace.display_name,
      };
      return formatedData;
    } catch (error) {
      throw error;
    }
  }
}
