class Image < ApplicationRecord
  belongs_to :album
  # belongs_to :user

  mount_uploader :picture, ImageUploader

  before_save :update_image_attributes

  private

  def update_image_attributes

  end
end
