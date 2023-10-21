import { Zip } from '@buh/unzip';

// type XlsxStreamReaderOptions = {
//   saxStrict: boolean;
//   saxNormalize: boolean;
//   saxPosition: boolean;
//   saxStrictEntities: boolean;
//   saxTrim: boolean;
//   verbose: boolean;
//   formatting: boolean;
//   tmpOption: unknown;
// };

export class XlsxStreamReader {
  //   private workBookSharedStrings = [];
  //   private workBookInfo = {
  //     sheetRelationships: {},
  //     sheetRelationshipsNames: {},
  //     date1904: false,
  //   };
  //   private parsedWorkBookInfo = false;
  //   private parsedWorkBookRels = false;
  //   private parsedSharedStrings = false;
  //   private waitingWorkSheets = [];
  //   private workBookStyles = [];
  //   private hasFormatCodes = false;
  //   private formatCodes = {};
  //   private xfs = {};
  //   private abortBook = false;

  async _handleWorkBookStream() {
    const file = Bun.file('fatura.xlsx');
    const arrayBuffer = await file.arrayBuffer();

    const zip = await Zip.create(arrayBuffer);
    for (const entry of zip.iterator()) {
      let match;
      switch (entry.fileName) {
        case 'xl/workbook.xml':
          console.log('Objeto encontrado', 'xl/workbook.xml');
          this._parseWorkBookInfo();
          break;

        case 'xl/_rels/workbook.xml.rels':
          console.log('Objeto encontrado', 'xl/_rels/workbook.xml.rels');
          break;

        case '_rels/.rels':
          console.log('Objeto encontrado', '_rels/.rels');
          break;

        case 'xl/sharedStrings.xml':
          console.log('Objeto encontrado', 'xl/sharedStrings.xml');
          break;

        case 'xl/styles.xml':
          console.log('Objeto encontrado', 'xl/styles.xml');
          break;

        default:
          if ((match = entry.fileName.match(/xl\/(worksheets\/sheet(\d+)\.xml)/i))) {
            console.log('regex 1', entry.fileName);
          } else if (
            (match = entry.fileName.match(/xl\/worksheets\/_rels\/sheet(\d+)\.xml.rels/i))
          ) {
            console.log('regex 2', entry.fileName);
          } else {
            // autodrain
          }
          break;
      }
    }
  }

  _parseWorkBookInfo(nodeData: unknown) {
    // Code here
  }
}
