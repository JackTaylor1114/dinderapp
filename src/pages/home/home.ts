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
  images = ["assets/imgs/stuhl1.jpg",
    "assets/imgs/stuhl2.jpg",
    "assets/imgs/stuhl3.jpg",
    "assets/imgs/stuhl4.jpg",
  ];

  /**
   * Constructor for Home-Class
   * @param sanitizer Helper to prevent Cross Site Scripting Security bugs
   * @param navCtrl the navigation controller
   * @param platform the app platform
   * @param httpClient the httpCleint
   */
  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, private platform: Platform, private httpClient: HttpClient) {
    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        asBg: sanitizer.bypassSecurityTrustStyle('url(' + this.images[i] + ')')
      });
    }
    this.ready = true;
    this.getImages();
  }

  /**
   * Do a HTTP-GET to the backend to get the images for displaying
   * TODO: Actual implementation
   */
  getImages() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe().subscribe((response) => {
      console.log(response[0].body);
    });
  }

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

  favorite(item: ItemSliding) {
  }

  share(item: ItemSliding) {
  }

  unread(item: ItemSliding) {
  }

  onCardInteract(event) {
    console.log(event);
  }

  close() {
    this.platform.exitApp();
  }
}
