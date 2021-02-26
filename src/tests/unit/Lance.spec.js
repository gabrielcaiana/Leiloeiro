import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('Verifica se o componente realmente exite', () => {
    const wrapper = mount(Lance)
    expect(wrapper).toBeTruthy()
})