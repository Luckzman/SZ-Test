import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';


describe('Main Component', () => {
  let wrapper;
  let useEffect;
  let props;

  let mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const results = [
    {
      id: '1',
      location: {
        distance: 1000
      },
      name: 'Indome',
      photo: {
        suffix: 'one',
        prefix: 'two',
        height: 'three',
        width: 'four'
      },
      isOpen: false,
      price: '1000'
    },
    {
      id: '2',
      location: {
        distance: 1000
      },
      name: 'Indome',
      photo: {
        suffix: 'one',
        prefix: 'two',
        height: 'three',
        width: 'four'
      },
      isOpen: false,
      price: '1000'
    }
];

  const info = {
    count: 671,
    next: "https://rickandmortyapi.com/api/character?page=2",
    pages: 34,
    prev: null
  }
  const fetchData = jest.fn()
  let result = {
    results,
    info
  }
    beforeEach(() => {
      useEffect = jest.spyOn(React, "useEffect");
      props = {
        longitude: 23.9900,
        latitude: 44.2323
        // fetchData: jest.fn().mockResolvedValue(result)
      }
      fetchData.mockReturnValueOnce({result})
      mockUseEffect();
      mockUseEffect();
      wrapper = shallow(<Main {...props} />);
    })
    describe('on start', () => {
      it('loads the cards', () => {
        expect(wrapper.find('#main')).toHaveLength(1)
      })
    })
})
