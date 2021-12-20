# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_20_155430) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "country_temperatures", force: :cascade do |t|
    t.date "recordedAt"
    t.decimal "averageTemperature", precision: 10, scale: 2
    t.decimal "averageTemperatureUncertainty", precision: 10, scale: 2
    t.string "country"
    t.datetime "created_at", precision: 6, default: -> { "now()" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "now()" }, null: false
    t.index ["country"], name: "index_country_temperatures_on_country"
  end

  create_table "dashboards", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "state_temperatures", force: :cascade do |t|
    t.date "recordedAt"
    t.decimal "averageTemperature", precision: 10, scale: 2
    t.decimal "averageTemperatureUncertainty", precision: 10, scale: 2
    t.string "state"
    t.string "country"
    t.datetime "created_at", precision: 6, default: -> { "now()" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "now()" }, null: false
    t.index ["country"], name: "index_state_temperatures_on_country"
    t.index ["state"], name: "index_state_temperatures_on_state"
  end

  create_table "trump_tweets", force: :cascade do |t|
    t.bigint "tweetId"
    t.string "link"
    t.text "content"
    t.datetime "publishedAt"
    t.integer "retweets"
    t.integer "favorites"
    t.string "mentions"
    t.string "hashtags"
    t.datetime "created_at", precision: 6, default: -> { "now()" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "now()" }, null: false
  end

end
