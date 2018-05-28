class AlbumsController < ApplicationController
  before_action :authenticate_user!

  def index
    @albums = current_user.albums
  end

  def create
    @album = Album.create(user: current_user, title: album_params[:title])
    redirect_to(albums_path)
  end

  def show
    @album = Album.find(params[:id])
  end

  private

  def album_params
    params.require(:new_album).permit(:title)
  end

end
