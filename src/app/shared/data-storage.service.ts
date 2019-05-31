import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators'
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipe-book-565d8.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  /*getRecipes() {
    return this.http.get('https://recipe-book-565d8.firebaseio.com/recipes.json').pipe(
      map((response) => {
        return response;
      })
    );
  }*/

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://recipe-book-565d8.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (recipes: Recipe[]) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
