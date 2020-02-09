import React, { useContext, Fragment } from 'react';
import RecipeContext from '../../context/Recipe/RecipeContext';
import RecipeProvider from '../../context/Recipe/RecipeProvider';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Recipe Context - show Query', () => {
  test('should able to turn on query prompt', () => {
    const TestComponent = () => {
      const { showQuery, dismissQuery, openQuery } = useContext(RecipeContext);
      return (
        <Fragment>
          <div data-testid='value'>{openQuery.toString()}</div>
          <span onClick={dismissQuery}>Off</span>
          <button onClick={showQuery}>Show</button>
        </Fragment>
      );
    };
    const wrapper = mount(
      <RecipeProvider>
        <TestComponent />
      </RecipeProvider>
    );

    wrapper.find('span').simulate('click');
    wrapper.find('button').simulate('click');

    expect(wrapper.find('[data-testid="value"]').text()).toEqual('true');
  });

  test('should able to turn off query prompt', () => {
    const TestComponent = () => {
      const { dismissQuery, openQuery } = useContext(RecipeContext);
      return (
        <Fragment>
          <div data-testid='value'>{openQuery.toString()}</div>
          <button onClick={dismissQuery}>Show</button>
        </Fragment>
      );
    };
    const wrapper = mount(
      <RecipeProvider>
        <TestComponent />
      </RecipeProvider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('[data-testid="value"]').text()).toEqual('false');
  });

  test('should able to turn off Retry prompt', () => {
    const TestComponent = () => {
      const { dismissRetry, openRetry } = useContext(RecipeContext);
      return (
        <Fragment>
          <div data-testid='value'>{openRetry.toString()}</div>
          <button onClick={dismissRetry}>Show</button>
        </Fragment>
      );
    };
    const wrapper = mount(
      <RecipeProvider>
        <TestComponent />
      </RecipeProvider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('[data-testid="value"]').text()).toEqual('false');
  });
});
