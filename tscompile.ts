import ts from 'typescript';
import path from 'path';

const tsCompilerOptions = {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
  incremental: true,
  skipLibCheck: true,
  outDir: 'dist',
  rootDir: path.join(__dirname, 'src'),
};

const dtsFiles = {};

// Create ts host and custom the writeFile and readFile.
const host = ts.createCompilerHost(tsCompilerOptions);
host.writeFile = (fileName, contents) => {
  dtsFiles[fileName] = contents;
};

// Create ts program.
const program = ts.createProgram(
  [path.resolve(__dirname, './src/index.tsx')],
  tsCompilerOptions,
  host
);

const emitResult = program.emit();

if (emitResult.diagnostics && emitResult.diagnostics.length > 0) {
  emitResult.diagnostics.forEach((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      '\n'
    );
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      console.error(
        'DTS',
        `${diagnostic.file.fileName} (${line + 1}, ${character + 1
        }): ${message}`
      );
    } else {
      console.error('DTS', message);
    }
  });
}
