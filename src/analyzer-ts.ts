import ts from 'typescript';

export function analyze(fileName: string, fileContents: string) {
  const sourceFile = ts.createSourceFile(fileName, fileContents, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  console.log(sourceFile.getFullText())
  console.log('child count', sourceFile.getChildCount());
  console.log('---------------');
  sourceFile.getChildren()
  for (const topLevelNode of sourceFile.statements) {
    switch (topLevelNode.kind) {
      case ts.SyntaxKind.ImportDeclaration:
        console.log('import    :', topLevelNode.getText());
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        console.log('fn decl   :', (topLevelNode as ts.FunctionDeclaration).name?.getText() || 'anonymous');
        break;
      case ts.SyntaxKind.ClassDeclaration:
        console.log('class decl:', (topLevelNode as ts.ClassDeclaration).name?.getText() || 'anonymous');

        break;
      case ts.SyntaxKind.VariableDeclaration:
        console.log('var decl  :', topLevelNode.getText());
        break;
        case ts.SyntaxKind.ExpressionStatement:
          console.log('exp stmt:', topLevelNode.getText());
          break;
      default:
        throw new Error(`unsupported node type: ${topLevelNode.kind}`);

    }
  }
  //ts.createProgram().
  //ts.createProgram({})
}

console.log('ff')

class Foo {}

class Bar {
  constructor(private f = new Foo()) {}
}

new Bar();
2 ? 3 : 4;

const x = class {
  greet() {
    return new Foo();
  }
}
