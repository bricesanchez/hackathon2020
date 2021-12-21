class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.jsonb :filters
      t.string :associated_model
      t.timestamps
    end
  end
end
