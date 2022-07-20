# absen-abuhurairah

url website get: https://absenustad.herokuapp.com/
url untuk delete: https://absenustad.herokuapp.com/?query

link untuk mendapatkan data berbentuk json : https://absenustad.herokuapp.com/json

ex : https://absenustad.herokuapp.com/json?tgl=1&bln=4&thn=2022&sesi=3

querynya: {
tgl : untuk tanggal specific,
bln : untuk bulan specific,
thn : untuk tahun specific,
sesi : untuk sesi specific,
}

querynya bisa digunakan untuk get ataupun delete data
tambahan query untuk delete : id (dari objectId) 

article cara memasukkan data bentuk json ke google sheet :https://apipheny.io/import-json-google-sheets/
data yang dimasukkan ke function di google sheetnya langsung aja query, tidak perlu menambahkan parameter query di function importJSON nya 

route untuk tambah absen : https://absenustad.herokuapp.com/api/newAbsen?apiKey=apikey

