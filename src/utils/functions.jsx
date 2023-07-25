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
      const data = XLSX.utils.sheet_to_json(ws, { raw: true });

      // Tüm sütun başlıklarını al ve sütunların tamamını tutacak bir obje oluştur
      const allColumns = {};
      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          allColumns[key] = true;
        });
      });

      // Eksik sütunlarda boş bir hücre göstermek için tüm verilere tekrar bak
      data.forEach((item) => {
        Object.keys(allColumns).forEach((column) => {
          if (!item.hasOwnProperty(column)) {
            item[column] = ""; // Eksik sütunda boş bir hücre göstermek için boş string yap
          }
        });
      });

      resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
