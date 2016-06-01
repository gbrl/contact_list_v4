class AddContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_work
      t.string :phone_personal
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end
