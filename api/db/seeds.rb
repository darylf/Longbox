return unless Rails.env.development?

CLEAN_ALL_RECORDS = true
USERS_TO_CREATE = 5
CREATORS_TO_CREATE = 20..40
SERIES_TO_CREATE = 5..15
BOOKS_ON_EACH_SERIES = 3..12

def get_number_to_create(val)
  val.is_a?(Range) ? rand(val) : val
end

['Creator', 'Writer', 'Penciller', 'Colorist', 'Inker', 'Cover Artist', 'Letterer', 'Editor', 'Assistant Editor'].each do |c|
  CreditRole.find_or_create_by(name: c)
end

['Comic', 'Trade Paperback', 'Hard Cover'].each do |t|
  BookFormat.find_or_create_by(name: t)
end

if CLEAN_ALL_RECORDS
  puts 'Cleaning data...'
  Credit.destroy_all
  Book.destroy_all
  Series.destroy_all
  Publisher.destroy_all
  Creator.destroy_all
  User.destroy_all
end

User.find_or_create_by(email: 'daryl@example.com') do |user|
  user.name = 'Daryl'
  user.password = 'password'
end

Dir[Rails.root.join('db', 'seeds', '*.rb')].sort.each do |file|
  require file
end
