require 'sinatra'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end

# Homepage (Root path)
get '/' do
  erb :index
end

namespace '/api' do
  namespace '/v1' do

    ## BASE ENTRY POINT
    get '/' do
      json({ message: "Welcome to the Contact List API" })
    end

    ## LIST ALL CONTACTS
    get '/contacts' do
     contacts = Contact.all
     json({message: "Success", contacts: contacts})
    end

    ## DESTROY CONTACT
    post '/contacts/:id/destroy' do
      contact = Contact.find(params[:id])
      contact.destroy
      json({message: "Success", contact: contact})
    end

    ## SHOW ONE CONTACT
    get '/contacts/:id' do
     begin
       Contact.find(params[:id]).to_json
     rescue ActiveRecord::RecordNotFound => error
       STDERR.puts error
       status 404
     end
    end

    ## ADD ONE CONTACT
    post '/contacts' do
      new_contact = Contact.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      phone_work: params[:phone_work],
      phone_personal: params[:phone_personal])

      if new_contact.valid?
        new_contact.save
        contact = Contact.last
        json({ message: "Success", contact: contact })
      else
        json({ message: new_contact.errors })
      end
    end

    ## UPDATE A CONTACT
    post '/contacts/:id/edit' do
      contact = Contact.find(params[:id])
      if contact.update_attributes(first_name: params[:first_name],
        last_name: params[:last_name],
        email: params[:email],
        phone_work: params[:phone_work],
        phone_personal: params[:phone_personal])
        json({ message: "Success", contact: contact })
      else
        json({message: "Update failed"})
      end
    end

  end
end
