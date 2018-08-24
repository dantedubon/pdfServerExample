import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';
import toPdf from 'office-to-pdf';
import Pack from './package.json';

exports.default = {
  pkg: Pack,
  register: async (server: Object) => {
    server.route([
      {
        method: 'GET',
        path: '/pdf',
        handler: (request, h) =>
          (async () => {
            const fakeData = {
              propertyname: 'Test Property',
              leasesigndate: '2018-08-22',
              lease_signer: [
                {
                  type: 'Finantial',
                  firstName: 'John',
                  lastName: 'Doe',
                },
                {
                  type: 'Non Finantial',
                  firstName: 'Felipe',
                  lastName: 'De Castilla',
                },
              ],
              minor_occupants: [
                {
                  firstName: 'Laura',
                  lastName: 'Kichner',
                },
                {
                  firstName: 'Alejo',
                  lastName: 'Carpenter',
                },
              ],
            };
            const content = fs.readFileSync(
              path.resolve(`${__dirname}/pdfTemplates`, 'Elmington_Lease_8.8.18.docx'),
              'binary',
            );
            const zip = new JSZip(content);
            const doc = new Docxtemplater();

            doc.loadZip(zip);
            doc.setData(fakeData);
            try {
              // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
              doc.render();
            } catch (error) {
              const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
              };
              console.log(JSON.stringify({ error: e }));

              throw error;
            }
            const buf = doc.getZip().generate({ type: 'nodebuffer' });
            // fs.writeFileSync(path.resolve(`${__dirname}/pdfTemplates`, 'output.docx'), buf);
            const pdfBuffer = await toPdf(buf);
            const response = h.response(pdfBuffer);
            response
              // .type('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
              .type('application/pdf')
              .header('Content-length', pdfBuffer.length)
              .header('Content-disposition', 'inline; filename= appartamentLease.pdf')
              .encoding('binary');

            return response;

            // const file = h.file(`${__dirname}/pdfTemplates/output.docx`, {
            //   filename: 'appartamentLease.docx',
            //   mode: 'attachment',
            // });

            // return file;
          })(),
        options: {
          auth: false,
        },
      },
    ]);
  },
};
