import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordStrengthBar } from "./PasswordStrengthBar";

describe('PasswordStrengthBar', () => {
  describe('password validation', () => {
    it('displays \'Good\' password security level when 3/4 requirements met', () => {
      const password = 'secretPassw0rd'
      render(
        <PasswordStrengthBar password={password}/>
      )
      expect(screen.getByText('Good')).toBeInTheDocument()
    })

    it('displays \'Strong\' password security level when all requirements met', () => {
      const password = 'secretPa$$w0rd'
      render(
        <PasswordStrengthBar password={password}/>
      )
      expect(screen.getByText('Strong')).toBeInTheDocument()
    })
  })
})