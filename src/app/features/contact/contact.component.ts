import { MenuService } from './../../core/services/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  buttonColor$: any; // Observable<IMenuSection>;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      message: [null, [Validators.required]],
    });

    this.buttonColor$ = this.menuService
                              .activeSection$
                              .pipe(
                                switchMap(activeSection => this.menuService
                                                                  .menu$
                                                                  .pipe(
                                                                    map(menu => {
                                                                      const activeSectionIndex = menu.sections.findIndex(section => section.id === activeSection.id);
                                                                      const previousSection = menu.sections[activeSectionIndex - 1];

                                                                      return previousSection && previousSection.background_color;
                                                                    })
                                                                  )
                                )
                              );
  }

  sendMessage(message: IMessage) {
    // TODO: Integrate with server
    console.log('sendMessage', message);
  }
}
