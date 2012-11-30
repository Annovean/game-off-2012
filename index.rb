require 'sinatra'

get '/' do
  File.read(File.join('web', 'web.html'))
end

get '/web.unity3d' do
  File.read(File.join('web', 'web.unity3d'))
end
