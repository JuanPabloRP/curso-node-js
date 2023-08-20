const os = require('node:os');

console.log('OS info: ');
console.log('---------------------------');
console.log('OS name: ' + os.platform());
console.log('OS version: ' + os.release());
console.log('OS arch: ' + os.arch());
console.log('CPUs: ' + os.cpus());
console.log('Free memo: ' + os.freemem() / 1024 / 1024);
console.log('Total memo: ' + os.totalmem() / 1024 / 1024);
console.log('uptime', os.uptime() / 60 / 60);
