import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { LoadingService } from '../components/several-components/loading/loading.service';
import { jsPDF } from "jspdf";
// declare const jsPDF: any;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportDataService {

    observ = new Subject();

    constructor(
        private _httpClient: HttpClient,
        private _loadingService: LoadingService,
    ) {
    }

    public exportAsExcelFile(columns: any[], data: any[], excelFileName: string): void {
        const formatedData = this.formatXLSData(columns, data);

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formatedData);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
        this._loadingService.hide();
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION);
    }

    public formatXLSData(columns, data) {
        let rowsXLSX = [];

        for (let index = 0; index < data.length; index++) {
            let objXLSX = {};
            for (let i = 0; i < columns.length; i++) {
                objXLSX[columns[i].title] = data[index][columns[i].dataKey];
            }
            rowsXLSX.push(objXLSX)
        }

        return rowsXLSX;
    }

    public formatPDFData(columns, data) {
        const rowsPDF = [];

        for (let index = 0; index < data.length; index++) {
            let objPDF = {};
            for (let i = 0; i < columns.length; i++) {
                objPDF[columns[i].dataKey] = data[index][columns[i].dataKey];
            }
            rowsPDF.push(objPDF);
        }

        return rowsPDF;
    }

    b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
