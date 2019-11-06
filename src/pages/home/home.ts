import {Component, EventEmitter} from '@angular/core';
import {ItemSliding, NavController, Platform} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {ChatmainPage} from '../chatmain/chatmain';
import {ChatindPage} from '../chatind/chatind';
import {SettingsPage} from '../settings/settings';
import {LoginPage} from '../login/login';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

/**
 * Class representing the Home page
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Attributes
  ready = false;
  server = 'http://phils.network:8080';
  images = [];
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  /**
   * Constructor for Home-Class
   * @param sanitizer Helper to prevent Cross Site Scripting Security bugs
   * @param navCtrl the navigation controller
   * @param platform the app platform
   * @param httpClient the httpClient
   */
  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, private platform: Platform, private httpClient: HttpClient) {
    this.getImages();
  }

  /**
   * Do a HTTP-GET request to the backend server and request a list of images for display (async)
   */
  getImages() {
    console.log('Getting images from ' + this.server);
    this.httpClient.get(this.server + '/api/v0.1/chairs').pipe().subscribe(response => {

      //Create local variable to cache request results
      let images: any;
      images = response;

      //Loop trough all entries in the response and store the paths
      for (let image of images) {
        this.images.push(this.server + image.path);
        console.log('Received Image from server: Name: ' + image.name + ' Path: ' + image.path);
      }
      //Call the function to load the images into the swipecards
      this.storeImages();
    });
  }

  /**
   * Use the paths to the images on the server to load the images into the swipecards
   */
  storeImages() {
    //Load all images into swipecards
    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        asBg: this.sanitizer.bypassSecurityTrustStyle('url(' + this.images[i] + ')')
      });
    }
    //Signal that the loading is finished
    this.ready = true;
  }

  /**
   * React when one of the swipecards has been moved left or right
   * @param event Representation of the user swipe in the form {like: true} or {like: false}
   */
  onCardInteract(event) {
    console.log(event);
  }
}

  /*

  prof() {
    this.navCtrl.push(ProfilePage);
  }

  chatm() {
    this.navCtrl.push(ChatmainPage)
  }

  chatid() {
    this.navCtrl.push(ChatindPage)
  }

  pho() {
    this.navCtrl.push(SettingsPage)
  }

  lgn() {
    this.navCtrl.push(LoginPage)
  }

  favorite(item
             :
             ItemSliding
  ) {
  }

  share(item
          :
          ItemSliding
  ) {
  }

  unread(item
           :
           ItemSliding
  ) {
  }

  close() {
    this.platform.exitApp();
  }
}

*/
