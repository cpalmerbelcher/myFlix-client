import { Component, OnInit } from '@angular/core';
import { FetchApiDataServices } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataServices,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavs(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs);
      return this.favs;
    });
  }

  /**
   * checks if movie is favorited
   * @param id
   * @returns
   */
  isFavorited(id: string): boolean {
    return this.favs.includes(id);
  }

  /**
   * add a favorite movie
   * @param id
   */
  handleFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
      this.getFavs();
    })
  }

  /**
   * deletes a favorite movie
   * @param id
   */
  handleUnfavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe(() => {
      this.getFavs();
    })
  }

  /**
   * open the director component to viwe info
   * @param name
   * @param bio
   * @param birth
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }

  /**
   * opens the genre component to view info
   * @param name
   * @param description
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * open the synopsis component to view infor
   * @param title
   * @param imagePath
   * @param description
   */
  openSynopsis(title: string, imagePath: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

}
