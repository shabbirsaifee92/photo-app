class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :services]

  def index
  end

  def services
  end

end
