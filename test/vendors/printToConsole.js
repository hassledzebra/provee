function printToConsole(string){
    string = string + '\n';
    var currentLine = consoleOutput.getSession().getLength();
		consoleOutput.gotoLine(currentLine,0,false);
		consoleOutput.insert(string);// insert at cursor;
		
		consoleOutput.getSession().addGutterDecoration(currentLine,'code_message');
}