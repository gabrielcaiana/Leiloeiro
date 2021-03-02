import Lance from "@/components/Lance";
import { mount } from "@vue/test-utils";

test("Não aceita lance com o valor é menor que zero", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(-100);
  const lancesEmitidos = wrapper.emitted("novo-lance");
  wrapper.trigger("submit");
  expect(lancesEmitidos).toBeUndefined();
});

test("Emite um lance quando o valor é maior que zero", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(100);
  wrapper.trigger("submit");
  const lancesEmitidos = wrapper.emitted("novo-lance");
  expect(lancesEmitidos).toHaveLength(1);
});

test("Emite o valor esperado de um lance válido", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(100);
  wrapper.trigger("submit");
  const lancesEmitidos = wrapper.emitted("novo-lance");
  const lance = parseInt(lancesEmitidos[0][0]);
  expect(lance).toBe(100);
});

describe("Um lance com valor mínimo", () => {
  test("Todos os lances devem possuir um valor maior do que o mínimo informado", () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(400);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    expect(lancesEmitidos).toHaveLength(1);
  });
  test("Emite o valor esperado de um lance válido", () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(400);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    const valorDoLance = parseInt(lancesEmitidos[0][0]);
    expect(valorDoLance).toBe(400);
  });
  test("Não aceita lances com valores menores do que o mínimo informado", async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgError = wrapper.find('p.alert').element
    expect(msgError).toBeTruthy()
  });
});
