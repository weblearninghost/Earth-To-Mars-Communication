import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getChar(num: number, occurrence: number) {
    let char = '';
    switch (num) {
      case 2:
        char = occurrence == 1 ? 'a' : occurrence == 2 ? 'b' : 'c';

        break;
      case 3:
        char = occurrence == 1 ? 'd' : occurrence == 2 ? 'e' : 'f';

        break;
      case 4:
        char = occurrence == 1 ? 'g' : occurrence == 2 ? 'h' : 'i';

        break;
      case 5:
        char = occurrence == 1 ? 'j' : occurrence == 2 ? 'k' : 'l';

        break;
      case 6:
        char = occurrence == 1 ? 'm' : occurrence == 2 ? 'n' : 'o';

        break;
      case 7:
        char =
          occurrence == 1
            ? 'p'
            : occurrence == 2
            ? 'q'
            : occurrence == 3
            ? 'r'
            : 's';

        break;
      case 8:
        char = occurrence == 1 ? 't' : occurrence == 2 ? 'u' : 'v';

        break;
      case 9:
        char =
          occurrence == 1
            ? 'w'
            : occurrence == 2
            ? 'x'
            : occurrence == 3
            ? 'y'
            : 'z';

        break;

      default:
        char = '';
        break;
    }
    return char;
  }
  getKeyNumber(char: string) {
    const asciiValue = char.charCodeAt(0);
    const grp =
      97 <= asciiValue && asciiValue <= 99
        ? 2
        : 100 <= asciiValue && asciiValue <= 102
        ? 3
        : 103 <= asciiValue && asciiValue <= 105
        ? 4
        : 106 <= asciiValue && asciiValue <= 108
        ? 5
        : 109 <= asciiValue && asciiValue <= 111
        ? 6
        : 112 <= asciiValue && asciiValue <= 115
        ? 7
        : 116 <= asciiValue && asciiValue <= 118
        ? 8
        : 119 <= asciiValue && asciiValue <= 122
        ? 9
        : asciiValue == 32
        ? ' '
        : '';

    if (grp == ' ' || grp == '') return grp;
    const s = grp;

    let start = s;
    let code = 0;
    let reminder = 0;
    reminder = asciiValue % 3;
    let iteration = 0;
    iteration = reminder == 0 ? 3 : reminder == 1 ? 1 : 2;
    if (grp == 7) {
      iteration = 112 <= asciiValue && asciiValue <= 114 ? iteration : 4;
    } else if (grp == 8) {
      iteration = reminder == 2 ? 1 : reminder == 0 ? 2 : 3;
    } else if (grp == 9) {
      reminder = asciiValue % 4;

      iteration = reminder == 3 ? 1 : reminder == 0 ? 2 : reminder == 1 ? 3 : 4;
    }
    if (iteration == 1) {
      code = start;
    }

    for (let i = 1; i < iteration; i++) {
      start = start * 10 + s;
      code = start;
    }
    if (code) return code;
    return '';
  }
  translationFromMars(message: string) {
    const splitedvalues = message.split('');

    let messagefromMars = '';
    splitedvalues.forEach((char) => {
      const grp = this.getKeyNumber(char);
      messagefromMars = messagefromMars + grp;
    });
    return messagefromMars;
  }
  translationFromEarth(message: number) {
    let trans = '';
    const s = message.toString().match(/([2-9.\s])\1*/g) || [];
    s.map((itm) => {
      if (itm.charAt(0) !== '.') {
        const char = this.getChar(parseInt(itm.charAt(0)), itm.length);
        if (itm.charAt(0) === ' ') trans = trans + ' ' + char;
        trans = trans + char;
      }
    });
    return trans;
  }
  messageService(message: any, sender: string): object {
    let translation: any = '';
    if (sender == 'earth') {
      translation = this.translationFromMars(message);
      return {
        'response from mars': translation,
        'message from earth': message,
      };
    } else if (sender == 'mars') {
      translation = this.translationFromEarth(message);
      return {
        'response from earth': translation,
        'message from mars': message,
      };
    } else {
      return InternalServerErrorException;
    }
  }
}
