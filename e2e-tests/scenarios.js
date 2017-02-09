'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#!/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
        expect($('#view1').isPresent()).toBeTruthy();
        console.log(element.all(by.css('[ng-view] md-content')).first())
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
        expect($('#view2').isPresent()).toBeTruthy();
        console.log(element.all(by.css('[ng-view] md-content')).first())
    });

  });
});
