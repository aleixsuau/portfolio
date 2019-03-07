import { TestBed } from '@angular/core/testing';

import { PortfolioResolverService } from './portfolio.resolver';

describe('PortfolioResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfolioResolverService = TestBed.get(PortfolioResolverService);
    expect(service).toBeTruthy();
  });
});
