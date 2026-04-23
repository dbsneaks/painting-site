require 'webrick'
server = WEBrick::HTTPServer.new(
  Port: 3456,
  DocumentRoot: '/Users/danabrook/Documents/painting-site'
)
trap('INT') { server.shutdown }
server.start
