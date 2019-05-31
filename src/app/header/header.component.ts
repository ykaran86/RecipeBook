import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private dataStoreService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStoreService.storeRecipes().subscribe(
      (response: Response) => console.log(response)
    );
  }

  /*onFetchData() {
    this.dataStoreService.getRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }*/

  onFetchData() {
    this.dataStoreService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}

