import Leilao from "@/components/Leilao";
import { mount } from "@vue/test-utils";

const leilao = {
    produto: 'Vue.js mão na massa',
    lanceInicial: 50,
    descricao: 'Um ótimo livro sobre vue.js'
}

describe('Um leilão exibe os dados do produto', () => {
    test('Exibe os dados do leilão no card', () => {
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        })
        expect(wrapper).toBeTruthy()
    })
})