import * as XLSX from "xlsx";


export function readExcel(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws, { raw: true });

      // Add "#" column with row numbers
      data = data.map((item, index) => {
        return { "#": index + 1, ...item };
      });

      // Başlık sırasını veri ile uyumlu hale getir
      const columnTitles = Object.keys(data[0]);

      // Eksik sütunlarda boş bir hücre göstermek için tüm verilere tekrar bak
      data.forEach((item) => {
        columnTitles.forEach((column) => {
          if (!item.hasOwnProperty(column)) {
            item[column] = " ";
          }
        });
      });


      return resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}