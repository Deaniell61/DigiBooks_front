import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-digibooks-component',
  templateUrl: './digibooks.component.html',
  styleUrls: ['./digibooks.component.css']
})
export class DigibooksComponent implements OnInit {
  public selected = 1;
  public libroId = 1;
  private _esAdmin;
  constructor(
    private route: ActivatedRoute,
    private location: Router,
  ) { }

  ngOnInit() {
    this.libroId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (this.libroId > 0) {
      this.selected = 2;
    }
  }
  cambiarTab(value) {
    this.selected = value;
    if (value === 3 && this.esAdmin) {
      this.selected = 2;
      console.log(this.selected);
    }
    if (value === 2 && this.esAdmin) {
      this.selected = 2;
    }
    if (value === 1) {
      let path = this.route.snapshot['_routerState'].url;
      const th = path.split('/');
      if (th.length >= 5) {
        const con = th[th.length - 1];
        path = path.slice(con.length);
        path = path.substr(0, path.length - (con.length + 1));
      }
      this.location.navigate([path]);
    }
  }
  obtenerLibro(value) {
    this.libroId = value;
    const path = this.route.snapshot['_routerState'].url;
    this.location.navigate([path + '/' + value]);
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
}
