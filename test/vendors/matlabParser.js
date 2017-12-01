var matlabParser = $.getValues('../test/rule_matlabParser.js')

var parser = PEG.buildParser(matlabParser);
parser.parse("abba");
printToConsole(parser.parse("abba")); // returns ["a", "b", "b", "a"]
