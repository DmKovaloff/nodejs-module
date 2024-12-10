const path = require('node:path');
const fs = require('node:fs/promises')


const foo = async () => {
    const pathDir = path.join(__dirname, 'baseFolder');
    await fs.mkdir(pathDir, {recursive: true});

    const allFolders = ['dir1', 'dir2', 'dir3', 'dir4', 'dir5'];
    const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

    await Promise.all(allFolders.map(async (folder) => {
        const folderPath = path.join(pathDir, folder);
        await fs.mkdir(folderPath, {recursive: true});

        await Promise.all(files.map(async (file) => {
            await fs.writeFile(path.join(folderPath, file), 'Hello Okten')
        }));
    }));

    // const rlInstance = readline.createInterface({
    //     input:process.stdin,
    //     output: process.stdout
    // })
    //
    // rlInstance.question('What', (name) => {
    //     console.log(`Hello ${name}`);
    //     rlInstance.close();
    // })
}

void foo();
