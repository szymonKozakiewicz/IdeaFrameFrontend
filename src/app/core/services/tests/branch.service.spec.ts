import { TestBed } from '@angular/core/testing';
import { BranchService } from '../branch.service';
import { MapPanningService } from '../map-panning.service';
import { BranchMindMap } from '../../domain/entities/branch-mind-map';
import { NodeMindMap } from '../../domain/entities/node-mind-map';
import { NodeCoordinates } from '../../domain/entities/node-coordinates';
import { getPanningMapMock } from 'src/app/testHelpers/service-mock-generator';

describe('BranchService', () => {
    let service: BranchService;
    let mockPanningService=getPanningMapMock();

    beforeEach(() => {
        mockPanningService = jasmine.createSpyObj('MapPanningService', ['getReversedTranlationOfCoordinates']);
        TestBed.configureTestingModule({
            providers: [
                BranchService,
                { provide: MapPanningService, useValue: mockPanningService }
            ]
        });
        service = TestBed.inject(BranchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should activate branch create mode', () => {
        const newBranchSource = NodeMindMap.buildDefault();
        let isModeActive=false;
        service.branchCreateModeChanged$.subscribe((isActive) => {
            isModeActive = isActive;
        })

        //act
        service.activateBranchCreateMode(newBranchSource);

        //assert
        expect(isModeActive).toBeTrue();
    });

    it('should deactivate branch create mode', () => {

        //act
        service.deactivateBranchCreateMode();

        //assert
        expect(service.isBranchModeActive()).toBeFalse();
    });
});